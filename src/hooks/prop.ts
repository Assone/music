const generatePlatform = (platform: string): [string, RegExp] => [
  platform,
  new RegExp(platform, 'i'),
];

const platforms: [string, RegExp][] = ['GitHub', 'GitLab'].map(generatePlatform);

const getPlatform = (hosts: string) => ([_p, regexp]: [string, RegExp]) => regexp.test(hosts);
const getRepoUrl = (repo: string) => (/^https?:/.test(repo) ? repo : `https://github.com/${repo}`);
const getRepoText = (url: string, text: string) => {
  const defaultText = 'Source';
  if (text) return text;

  const hosts = url.match(/^https?:\/\/[^/]+/);
  if (!hosts) return defaultText;

  const platform = platforms.find(getPlatform(hosts[0]));
  return platform?.[0] ? platform[0] : defaultText;
};

// eslint-disable-next-line import/prefer-default-export
export const useProp = (config: IappConfig) => {
  const { repo, repoLabel = '', docsRepo } = config;
  const name = docsRepo || repo;

  if (!name) return null;
  const link = getRepoUrl(name);
  const text = getRepoText(link, repoLabel);

  return {
    text,
    link,
  };
};
