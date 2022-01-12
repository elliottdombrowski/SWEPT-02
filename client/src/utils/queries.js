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
      alderman
      address
      city
      state
      zipcode
      ward_phone
      ward_fax
      email
      website
    }
  }
`;