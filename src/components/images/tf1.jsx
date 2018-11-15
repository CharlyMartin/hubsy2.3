import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
// import Img from 'gatsby-image'

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `StaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.app/gatsby-image
 * - `StaticQuery`: https://gatsby.app/staticquery
 */

const Tf1 = () => {
  return (<StaticQuery
    query={graphql`
      query {
        Tf1: file(relativePath: {eq: "referrals/tf1.png"}) {
          childImageSharp {
            fixed {
              srcSet
              originalName
            }
          }
        }
      }
    `}

    render={data => {
      return (<img
        srcSet={data.Tf1.childImageSharp.fixed.srcSet}
        alt={data.Tf1.childImageSharp.fixed.originalName}
        />
      )}
    }
  />
)}

export default Tf1;