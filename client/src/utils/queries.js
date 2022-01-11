import { gql } from '@apollo/client';

export const GET_WARD = gql `
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