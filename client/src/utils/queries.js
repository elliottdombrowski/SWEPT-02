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
export const GET_ZIP = gql`
  query getZip($zipNumber: String) {
    getZip(zipNumber: $zipNumber) {
      ward: String,
      alderman: String,
      address: String,
      city: String,
      state: String,
      zipcode: String,
      ward_phone: String,
      ward_fax: String,
      email: String,
      website: {
        url: String
      },
    }
  }
`;