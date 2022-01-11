import { gql } from '@apollo/client';

export const GET_WARD = gql `
  query {
    getWard {
      ward_section_concatenated
      ward
      section
      month_name
      month_number
      dates
    }
  }
`;