// Single source of truth for server details. Edit here, not in the HTML.
export const SERVER = {
  name: "xDSMP",
  javaHost: "in-1.helixnodes.site",
  javaPort: 25001,
  version: "Paper 1.21.11",
  // Bedrock port is NOT confirmed yet. Set a number (e.g. 19132) only after verifying
  // it in your host panel / Geyser config.yml. While null, no port is shown.
  bedrockPort: null,
  discord: "https://discord.gg/nyBkn6xPb3",
  youtube: "https://www.youtube.com/@XDSMPOFFICIAL",
  instagram: "https://www.instagram.com/xdsmp.official/",
  statusApi: "https://api.mcstatus.io/v2/status/java/",
};
export const javaAddress = `${SERVER.javaHost}:${SERVER.javaPort}`;
