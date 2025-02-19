import React from "react";
import { graphql } from "gatsby";
import SEO from "../components/seo";
import WorkshopSinglePage from "../sections/Learn/Workshop-single/index";

export const query = graphql`query WorkshopBySlug($slug: String!) {
  mdx(fields: {slug: {eq: $slug}}) {
    frontmatter {
      title
      date(formatString: "MMMM Do, YYYY")
      slack
      abstract
      status
      labs
      video
      eurl
      thumbnail {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED)
        }
        extension
        publicURL
      }
    }
    fields {
      slug
    }
  }
}
`;

const WorkshopSingle = ({ data, children }) => {

  return (
    <>
      <WorkshopSinglePage frontmatter={data.mdx.frontmatter}>
        { children }
      </WorkshopSinglePage>
    </>
  );
};

export default WorkshopSingle;

export const Head = ({ data }) => {
  return  <SEO title={data.mdx.frontmatter.title} image={data.mdx.frontmatter.thumbnail.publicURL} />;
};