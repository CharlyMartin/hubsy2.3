import React from 'react';
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout';
import PageHeader from '../components/page_header';
import Disclaimer from '../components/disclaimer';
import ButtonA from '../components/button_a';
import CardLink from '../components/card_link';

import '../css/pages/room.css'

class RoomsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  prefixLocale(path) {
    return `${this.props.pageContext.prefix}${path}`;
  }

  renderCards(array, locale) {
    return (
      <div className="rooms">
        {array.map(obj => {
          const rooms = obj.node.data.linked_rooms;
          return (
            <div className="room-item mg-xxl-bottom pd-xxl-bottom" key={obj.node.data.name}>
              <div className="room-shop">
                <h2>{`Husby ${obj.node.data.name}`}</h2>
                <p>{obj.node.data.street}</p>
                {console.log(rooms)}
              </div>
            </div>
          )}
        )}
      </div>  
    )
  }

  filterObjects(array, lang = 'fr') {
    // Components are called internally during the build sequence,
    // it doesn't pass a locale arg, which makes it undefined.
    // Hence the function returns an empty object and fails the build process.
    // The default params 'fr' prevents that!
    return array.filter(obj => obj.node.data.language === lang);
  }
  
  render() {
    const pageContext = this.props.pageContext;
    const edges = this.props.data.allAirtable.edges;
    const shopsData = this.filterObjects(edges, pageContext.locale);

    return (
      <Layout prefix={pageContext.prefix} locale={pageContext.locale}>
        <div path="rooms" title={{"fr": "Salles de Réunions", "en": "Meeting Rooms"}}>
          <div className="container mg-xxl-top-bottom">
            <PageHeader title={pageContext.data.title} subtitle={pageContext.data.subtitle} />

            <div className="page-section">
              {this.renderCards(shopsData, pageContext.locale)}
            </div>

            <Disclaimer text={pageContext.data.privatise}>
              <ButtonA text={pageContext.data.button} path="#" class="button-beige-transparent" />
            </Disclaimer>
          </div>
        </div>
      </Layout>
    )
  }
}
  
export default RoomsPage;

// Two sources of data for this component:
// - props.pageContext => coming from the createPage() action in gatsby-node
// - props.data => coming from the page Query below




export const query = graphql`
{
  allAirtable(filter: {table: {eq: "shops"}}) {
    edges {
      node {
        data {
          name
          language
          street
          postcode
          city
          status
          live
          slug
          linked_rooms {
            data {
              name
              language
              capacity
              capacity
              pictures {
                url
              }
              supersaas
            }
          }
        }
      }
    }
  }
}
`
