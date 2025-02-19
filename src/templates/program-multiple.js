import React, { useState } from "react";
import { graphql } from "gatsby";
import SEO from "../components/seo";
import ProgramsSingle from "../sections/Careers/Careers-Programs-single";

export const query = graphql`
    query ProgramByName($program: String!) {
        allMdx(
          sort: {fields: [frontmatter___title], order: DESC}
          filter:{frontmatter: { program: { eq: $program } }}
        ) {
          nodes{
            frontmatter {
                title
                program
            }
          }
        }
    }
`;

const ProgramsPage = ({ data, children }) => {
  const [activeOption, setActiveOption] = useState(0);
  const programs = data.allMdx.nodes;

  const options = programs.map((program, index) => {
    let optionItem = new Object();
    optionItem.label = program.frontmatter.title;
    optionItem.value = index;
    return optionItem;
  });

  return (
    <>
      <ProgramsSingle
        data={programs[activeOption]}
        options={options}
        setActiveOption={setActiveOption}
        activeOption={activeOption}
      >
        { children }
      </ProgramsSingle>
    </>
  );
};

export default ProgramsPage;

export const Head = ({ data }) => {
  const programs = data.allMdx.nodes;
  return <SEO title={programs[0].frontmatter.program} />;
};