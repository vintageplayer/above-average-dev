import {config} from './config'

// TODO: Create login to secure way to accept tokens
const GITHUB_TOKEN = config.GITHUB_TOKEN;

const GITHUB_USER_CONTRIBUTIONS_QUERY = `
query( $username:String! ) {
	user(login: $username){
		contributionsCollection {
			contributionCalendar {
				totalContributions
				weeks {
					contributionDays {
						contributionCount
						date
					}
				}
			}
		}
	}
}
`;

export async function getUserContributions(github_username: string): Promise<any> {
  const variables = `
  {
    "username": "${github_username}"
  }
`
  const body = {
    query: GITHUB_USER_CONTRIBUTIONS_QUERY,
    variables
  }

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify(body)
  })
  return res.json()
}