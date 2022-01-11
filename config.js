const config = {
  gatsby: {
    pathPrefix: '/',
    siteUrl: 'https://hrithiks-notes.netlify.app',
    gaTrackingId: 'UA-165545273-1',
    trailingSlash: false,
  },
  header: {
    logo: 'https://raw.githubusercontent.com/GearHost/docs/master/Images/Professortocat_v2.png',
    logoLink: '/',
    title: "<a href='/'>Hrithik's Notes</a>",
    githubUrl: 'https://github.com/CoderHahs/notes',
    helpUrl: '',
    tweetText: '',
    social: ``,
    links: [{ text: '', link: '' }],
    search: {
      enabled: true,
      indexName: 'Hrithiks-notes',
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: [],
    collapsedNav: [
      // add trailing slash if enabled above
      '/ai',
      '/ai/data_science',
      '/ai/virtual_assistants',
      '/astronomy',
      '/computer_science',
      '/computer_science/web_programming_cs50w',
      '/computer_science/discrete_structures',
      '/computer_science/operating_systems',
      '/computer_science/databases',
      '/computer_science/algorithms',
      '/computer_science/programming_with_cpp',
      '/math',
      '/math/lin_alg',
      '/math/stats_prob',
      '/math/discrete_math',
      '/software_engineering',
      '/software_engineering/analysis_design_ui',
      '/software_engineering/quality_assurance',
      '/software_engineering/software_arch',
      '/software_engineering/software_construction',
      '/software_engineering/software_requirements',
      '/software_engineering/data_communication_networking',
    ],
    links: [{ text: 'Portfolio', link: 'https://hrithikshah.com' }],
    frontline: false,
    ignoreIndex: true,
    // title:
    //   "<a href='https://hrithikshah.com'>Hrithik's </a><div class='greenCircle'></div><a href='https://hrithiks-notes.netlify.app'>Notes</a>",
  },
  siteMetadata: {
    title: "Hrithik's notes",
    description: 'A place for my learnings over the years',
    ogImage: null,
    docsLocation: 'https://github.com/CoderHahs/notes/tree/master/content',
    favicon: 'https://raw.githubusercontent.com/GearHost/docs/master/Images/Professortocat_v2.png',
  },
  pwa: {
    enabled: false, // disabling this will also remove the existing service worker.
    manifest: {
      name: "Hrithik's Notes",
      short_name: 'H Notes',
      start_url: '/',
      background_color: '#6b37bf',
      theme_color: '#6b37bf',
      display: 'standalone',
      crossOrigin: 'use-credentials',
      icons: [
        {
          src: 'src/pwa-512.png',
          sizes: `512x512`,
          type: `image/png`,
        },
      ],
    },
  },
};

module.exports = config;
