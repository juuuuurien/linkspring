import React from 'react'


const PVLinkTab = ({ children, url, tabColor }) => {
    return (
      <a href={url} target="_new">
        <div
          style={{
            backgroundColor: tabColor,
          }}
          className={`flex rounded-xl justify-center items-center text-center text-white text-xs font-semibold w-full py-3.5 px-6 hover:scale-[1.05] transition-transform  hover:ease-[cubic-bezier(.11,-0.85,.75,1.83)]`}
        >
          {children}
        </div>
      </a>
    );
  };

const TabLayout = ({linkData, themeData}) => {
  return (
    <div className="LINKS-WRAPPER flex flex-col w-full gap-3 max-h-[55%] overflow-y-scroll no-scrollbar px-4">
              {linkData?.map((e) => {
                if (!e.url || !e.title) return;
                return (
                  <PVLinkTab
                    tabColor={themeData?.tabColor}
                    url={e.url}
                    key={e.title.concat(e.url)}
                  >
                    <span style={{ color: themeData.tabTextColor }}>
                      {e.title}
                    </span>
                  </PVLinkTab>
                );
              })}
            </div>
  )
}

export default TabLayout