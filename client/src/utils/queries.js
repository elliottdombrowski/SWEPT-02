import { gql } from '@apollo/client';

// works with the sweeper sched API for 'ward' + 'month_name' + 'month_number'
export const GET_WARD = gql`
  query getWard($wardNumber: String) {
    getWard(wardNumber: $wardNumber) {
      ward_section_concatenated
      ward
      section
      month_name
      month_number
      dates
    }
  }
`;

// works with the ward info API for 'zipcode'
export const GET_ZIP = gql`
  query getZip($zipNumber: String) {
    getZip(zipNumber: $zipNumber) {
      ward
      zipcode
    }
  }
`;

// works with the snow restriction parking info API for 'street'
export const GET_SNOW = gql`
  query getSnow($snowNumber: String) {
    getSnow(snowNumber: $snowNumber) {
      on_street
      from_stree
      to_street
    }
  }
`;