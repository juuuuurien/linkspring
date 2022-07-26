import React from "react";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

import MainContentSection from "../../components/dashboard/MainContentSection";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Head from "next/head";
import dbConnect from "../../util/mongoose";
import User from "../../models/User";

import { Button, Spinner } from "flowbite-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import LinkTab from "../../components/dashboard/components/LinkTab";

export default function Dashboard({ userdata }) {
  // data contains  username, links, profile of the user

  const url = process.env.NEXT_PUBLIC_URL;
  const queryClient = useQueryClient();

  const postLink = async () => {
    return await (
      await fetch(`/api/links`, {
        method: "POST",
        body: JSON.stringify({ type: "add", username: userdata.username }),
      })
    ).json();
  };

  const deleteLink = async (_id) => {
    return await (
      await fetch(`/api/links`, {
        method: "POST",
        body: JSON.stringify({
          type: "delete",
          username: userdata.username,
          _id: _id,
        }),
      })
    ).json();
  };

  const getLinks = async () => {
    return await (
      await fetch(`/api/links`, {
        method: "POST",
        body: JSON.stringify({ type: "get", username: userdata.username }),
      })
    ).json();
  };

  const updateLink = async (variables) => {
    const { _id, updateObj } = variables;

    return await (
      await fetch(`/api/links`, {
        method: "POST",
        body: JSON.stringify({
          type: "update",
          username: userdata.username,
          _id: _id,
          formData: updateObj,
        }),
      })
    ).json();
  };

  const { data, isLoading } = useQuery(["links"], getLinks, {
    initialData: userdata.links,
  });

  const handleAddLink = useMutation(postLink, {
    onMutate: async () => {
      await queryClient.cancelQueries(["links"]);
      const previousValue = queryClient.getQueryData(["links"]);

      queryClient.setQueryData(["links"], (old) => ({
        ...old,
        links: [...old.links, { url: "", title: "" }],
      }));
      return previousValue;
    },
    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData(["links"], previousValue),
    // After success or failure, refetch the links
    onSettled: () => {
      queryClient.invalidateQueries(["links"]);
    },
  });

  const handleDeleteLink = useMutation((_id) => deleteLink(_id), {
    onMutate: async (_id) => {
      await queryClient.cancelQueries(["links"]);
      const previousValue = queryClient.getQueryData(["links"]);

      queryClient.setQueryData(["links"], (old) => {
        const newLinks = old.links.filter((link) => link._id !== _id);
        return { ...old, links: newLinks };
      });

      return previousValue;
    },
    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData(["links"], previousValue),
    // After success or failure, refetch the links query
    onSettled: () => {
      queryClient.invalidateQueries(["links"]);
    },
  });

  const handleUpdateLink = useMutation((variables) => updateLink(variables), {
    onMutate: async (variables) => {
      await queryClient.cancelQueries(["links"]);
      const previousValue = queryClient.getQueryData(["links"]);

      const { _id, formData } = variables;

      queryClient.setQueryData(["links"], (old) => {
        const newLinks = old.links.map((link) => {
          if (link._id === _id) {
            return { ...link, ...formData };
          }
          return link;
        });

        return { ...old, links: newLinks };
      });

      return previousValue;
    },
    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) => {
      queryClient.setQueryData(["links"], previousValue);
      console.log(err);
    },
    // After success or failure, refetch the links query
    onSettled: () => {
      queryClient.invalidateQueries(["links"]);
    },
  });

  return (
    <>
      <Head>
        <title>Linkspring | Dashboard</title>
        <meta name="description" content="Linkspring dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout
        userdata={userdata}
        linkData={data?.links}
        profileData={userdata.profile}
      >
        <MainContentSection userdata={userdata}>
          <div className="flex flex-col items-center py-10 gap-12">
            <Button pill onClick={() => handleAddLink.mutate()}>
              <div className="text-lg font-bold w-full">
                {handleAddLink.isLoading ? <Spinner /> : "Add New Link"}
              </div>
            </Button>
            <div className="flex flex-col w-full h-full gap-2 items-center">
              {isLoading && <Spinner />}
              {data &&
                data?.links?.map((e, i) => (
                  <LinkTab
                    key={e._id}
                    _id={e._id}
                    url={e.url}
                    title={e.title}
                    handleUpdateLink={handleUpdateLink}
                    handleDeleteLink={handleDeleteLink}
                  />
                ))}
              {data?.links?.length === 0 && (
                <div className="flex w-full h-full justify-center items-center text-slate-500">
                  {"You have no links yet! Click the '+' to add some."}
                </div>
              )}
            </div>
          </div>
        </MainContentSection>
      </DashboardLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  // this is slow in production... maybe fetch client side to show skeleton while loading?

  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    dbConnect();
    const user = await User.findOne({ email: session.user.email });

    const { username, links, profile } = user;

    return {
      props: {
        session: JSON.parse(JSON.stringify(session)),
        userdata: JSON.parse(JSON.stringify({ username, links, profile })),
      },
    };
  }

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}
