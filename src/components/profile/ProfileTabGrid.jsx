import React from "react";

const PVLinkTab = ({ children, url, tabColor }) => {
  return (
    <a href={url} target="_new">
      <div
        style={{
          backgroundColor: tabColor,
        }}
        className={`flex justify-center items-center text-center text-white text-xs font-semibold w-full aspect-square py-3.5 px-6 hover:scale-[1.05] transition-transform  hover:ease-[cubic-bezier(.11,-0.85,.75,1.83)]`}
      >
        {children}
      </div>
    </a>
  );
};

const ProfileTabGrid = ({ linkData, themeData }) => {
  return (
    <div className="LINKS-WRAPPER grid grid-cols-3 w-full gap-2 max-h-[50%] overflow-y-scroll no-scrollbar px-2">
      {linkData?.map((e) => {
        if (!e.url || !e.title) return;
        return (
          <PVLinkTab
            tabColor={themeData?.tabColor}
            url={e.url}
            key={e.title.concat(e.url)}
          >
            <span style={{ color: themeData.tabTextColor }}>{e.title}</span>
          </PVLinkTab>
        );
      })}
    </div>
  );
};

export default ProfileTabGrid;
