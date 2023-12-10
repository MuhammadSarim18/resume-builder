import { View } from "@react-pdf/renderer";
import {
  ResumePDFIcon,
  type IconType,
} from "components/Resume/ResumePDF/common/ResumePDFIcon";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import {
  ResumePDFLink,
  ResumePDFLink2,
  ResumePDFSection,
  ResumePDFSection2,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import type { ResumeProfile } from "lib/redux/types";

export const ResumePDFProfile = ({
  profile,
  themeColor,
  isPDF,
}: {
  profile: ResumeProfile;
  themeColor: string;
  isPDF: boolean;
}) => {
  const { name, email, phone, url, summary, location } = profile;
  const iconProps = { email, phone, location, url };

  return (
    <ResumePDFSection style={{ marginTop: spacing["4"] }}>
      <ResumePDFText
        bold={true}
        // themeColor={themeColor}
        style={{ fontSize: "20pt", textAlign: "center" }}
      >
        {name}
      </ResumePDFText>
      <View
        style={{
          textAlign: "center",
        }}
      >
        {Object.entries(iconProps).map(([key, value]) => {
          if (!value) return null;

          // let iconType = key as IconType;
          // if (key === "url") {
          //   if (value.includes("github")) {
          //     iconType = "url_github";
          //   } else if (value.includes("linkedin")) {
          //     iconType = "url_linkedin";
          //   }
          // }

          const shouldUseLinkWrapper = ["email", "url", "phone"].includes(key);
          const Wrapper = ({ children }: { children: React.ReactNode }) => {
            if (!shouldUseLinkWrapper) return <>{children}</>;

            let src = "";
            switch (key) {
              case "email": {
                src = `mailto:${value}`;
                break;
              }
              case "phone": {
                src = `tel:${value.replace(/[^\d+]/g, "")}`; // Keep only + and digits
                break;
              }
              default: {
                src = value.startsWith("http") ? value : `https://${value}`;
              }
            }

            return (
              <ResumePDFLink src={src} isPDF={isPDF} >
                {children}
              </ResumePDFLink>

            );
          };

          return (
            <View
              key={key}
              style={{
                alignItems: "center",
              }}
            >
              {/* <ResumePDFIcon type={iconType} isPDF={isPDF} /> */}
              <Wrapper>
                <ResumePDFText >{value}</ResumePDFText>
              </Wrapper>
            </View>
          );
        })}
      </View>
      {summary && <ResumePDFText>{summary}</ResumePDFText>}
    </ResumePDFSection>
  );
};



export const ResumePDFProfile2 = ({
  profile,
  themeColor,
  isPDF,
}: {
  profile: ResumeProfile;
  themeColor: string;
  isPDF: boolean;
}) => {
  const { name, email, phone, url, summary, location } = profile;
  const iconProps = { email, phone, location, url };

  return (
    <ResumePDFSection2 style={{ marginTop: spacing["4"], backgroundColor: themeColor }}>
      <div style={{ display: "flex", flexDirection: "row", padding: "15px", gap: spacing["1"] }}>
        <div style={{ flex: 1 }}>
          <ResumePDFText bold={true} themeColor={'#fff'} style={{ fontSize: "25pt" }}>
            {name}
          </ResumePDFText>
        </div>
        <div style={{ display: "block", gap: spacing["0.5"], color: "#fff" }}>
          {Object.entries(iconProps).map(([key, value]) => {
            if (!value) return null;

            let iconType: string = key;

            if (key === "url") {
              if (value.includes("github")) {
                iconType = "url_github";
              } else if (value.includes("linkedin")) {
                iconType = "url_linkedin";
              }
            }

            const shouldUseLinkWrapper: boolean = ["email", "url", "phone"].includes(key);

            const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
              let src: string = value;

              if (shouldUseLinkWrapper) {
                if (key === "email") {
                  src = `mailto:${value}`;
                } else if (key === "phone") {
                  src = `tel:${value.replace(/[^\d+]/g, "")}`;
                } else {
                  src = value.startsWith("http") ? value : `https://${value}`;
                }
              }

              return (
                <div className={shouldUseLinkWrapper ? "w-10" : ""}>
                  <ResumePDFLink2 src={src} isPDF={isPDF}>
                    {children}
                  </ResumePDFLink2>
                </div>
              );
            };

            return (
              // <div key={key} style={{ display: "flex", alignItems: "center" }}>
              //   <ResumePDFIcon type={iconType as IconType} isPDF={isPDF} />
              //   <Wrapper>
              //     <ResumePDFText style={{ color: "#000" }}>{value}</ResumePDFText>
              //   </Wrapper>
              // </div>

              <div key={key} style={{ display: "inline", width: "200px" }}>
                {/* <ResumePDFIcon type={iconType as IconType} isPDF={isPDF} /> */}
                {/* Text Wrapper */}
                <Wrapper>
                  <ResumePDFText style={{ color: "#fff", fontWeight: 'bold' }}>{value}</ResumePDFText>
                </Wrapper>
              </div>
            );
          })}
        </div>
      </div>
      {summary && (
        <div style={{ marginTop: spacing["1"], color: "#white" }}>
          <ResumePDFText style={{ color: 'white', padding: '10px', fontWeight: 'medium' }} >{summary}</ResumePDFText>
        </div>
      )}
    </ResumePDFSection2>




  );
};