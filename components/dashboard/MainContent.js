import { Button, Spinner } from "flowbite-react";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import LinkTab from "./components/LinkTab";
import MainNavbar from "./MainNavbar";

const MainContent = ({ userdata }) => {
  const queryClient = useQueryClient();

  const postLink = async () => {
    return await (
      await fetch("http://localhost:3000/api/links", {
        method: "POST",
        body: JSON.stringify({ type: "add", username: userdata.username }),
      })
    ).json();
  };

  const deleteLink = async (_id) => {
    return await (
      await fetch("http://localhost:3000/api/links", {
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
      await fetch("http://localhost:3000/api/links", {
        method: "POST",
        body: JSON.stringify({ type: "get", username: userdata.username }),
      })
    ).json();
  };

  const updateLink = async (variables) => {
    console.log("IN THE UPDATE LINK FUNCTION", variables);

    const { _id, updateObj } = variables;

    return await (
      await fetch("http://localhost:3000/api/links", {
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

  console.log(data, "data from useQuery");

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
    // After success or failure, refetch the links query
    onSettled: () => {
      queryClient.invalidateQueries(["links"]);
    },
  });

  const handleDeleteLink = useMutation((_id) => deleteLink(_id), {
    onMutate: async (_id) => {
      await queryClient.cancelQueries(["links"]);

      const previousValue = queryClient.getQueryData(["links"]);

      queryClient.setQueryData(["links"], (old) => {
        console.log(old);
        const newLinks = old.links.filter((link) => link._id !== _id);
        console.log(newLinks, "newLinks");
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

      console.log(formData, "formData");
      console.log(_id, "_id");

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
    <section className="flex flex-col items-center h-full bg-gray-100 overflow-y-auto">
      <MainNavbar />
      <div className="mx-auto w-full max-w-[640px]">
        <div className="flex flex-col items-center py-10 gap-12">
          <Button pill onClick={() => handleAddLink.mutate()}>
            <div className="text-lg font-bold w-full">
              {handleAddLink.isLoading ? <Spinner /> : "Add New Link"}
            </div>
          </Button>
          <div className="flex flex-col w-full gap-2">
            {data?.links?.map((e, i) => (
              <LinkTab
                key={e._id}
                _id={e._id}
                url={e.url}
                title={e.title}
                handleUpdateLink={handleUpdateLink}
                handleDeleteLink={handleDeleteLink}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
