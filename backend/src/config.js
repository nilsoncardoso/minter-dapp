require('dotenv').config();
const basePath = process.cwd();
const fs = require("fs");
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// Metadados gerais para Ethereum
const namePrefix = "spacesoccer";
const description = "art of an astronaut kicking a ball in space";
const baseUri = "ipfs://NewUriToReplace"; // Isso será substituído automaticamente

// Se você selecionou Solana então a coleção começa do 0 automaticamente
const layerConfigurations = [
  {
    growEditionSizeTo: 2000,
    layersOrder: [
      { name: "Background" },
      { name: "Space scene" },
      { name: "Space suit" },
      { name: "Glove" },
      { name: "Mascot" },
      { name: "Ball" },
      { name: "Space boot" },
      { name: "Face" },
      { name: "Space helmet" },
    ],
  },
];

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 2500,
  height: 2500,
  smoothing: true,
};

const extraMetadata = {
  external_url: "https://nilsoncardoso.com.br/nft-space-soccer/", // Substitua pelo seu site ou remova esta linha se você não tiver um.
};

// NFTPort Info

// ** REQUIRED **
const AUTH = process.env.NFTPORT_API_KEY; // Defina isso no arquivo .env para evitar expor sua chave de API ao enviar para o Github
const LIMIT = 2; // Seu limite de taxa de chave de API
const CHAIN = 'polygon'; // apenas rinkeby ou polygon

// DETALHES DO CONTRATO NECESSÁRIOS QUE NÃO PODEM SER ATUALIZADOS MAIS TARDE!
const CONTRACT_NAME = 'spacesoccer';
const CONTRACT_SYMBOL = 'SS'; // isso e uma abreviacao do nome SpaceSoccer = SS, sacou:)
const METADATA_UPDATABLE = false; // defina como false se você não quiser permitir atualizações de metadados após a cunhagem
const OWNER_ADDRESS = '0xAe1345a928E9A998e894d2217e71124aDC94c2aD'; // numero da carteira metamask AQUI :)
const TREASURY_ADDRESS = '0xAe1345a928E9A998e894d2217e71124aDC94c2aD'; // posso repetir o mesmo numero aqui
const MAX_SUPPLY = 2000; // O número máximo de NFTs que podem ser cunhados. NÃO PODE SER ATUALIZADO!
const MINT_PRICE = 5; // Aqui e o preco que quero vender -- Preço de cunhagem por NFT. Rinkeby = ETH, Polygon = MATIC. NÃO PODE SER ATUALIZADO!
const TOKENS_PER_MINT = 10; // número máximo de NFTs que um usuário pode cunhar em uma única transação. NÃO PODE SER ATUALIZADO!

// DETALHES DO CONTRATO NECESSÁRIOS QUE PODEM SER ATUALIZADOS MAIS TARDE.
// Aqui o fuso horario e em utc -- ano mes dia hora e fuso horario
const PUBLIC_MINT_START_DATE = "2022-05-10T11:30:48+00:00"; // Isso é necessário. Eg: 2022-02-08T11:30:48+00:00

// DETALHES OPCIONAIS DO CONTRATO QUE PODEM SER ATUALIZADOS MAIS TARDE.
const PRESALE_MINT_START_DATE = null; // Optional. Eg: 2022-02-08T11:30:48+00:00
const ROYALTY_SHARE = 700; // Porcentagem do preço do token que vai para o endereço de royalties. 100 bps = 1%
const ROYALTY_ADDRESS = "0xAe1345a928E9A998e894d2217e71124aDC94c2aD"; // Endereço que receberá os royalties
const BASE_URI = null; // atualize apenas se você quiser definir manualmente o uri base
const PREREVEAL_TOKEN_URI = null; // atualize apenas se você quiser definir manualmente o token de pré-revelação uri
const PRESALE_WHITELISTED_ADDRESSES = []; // atualize apenas se você quiser definir manualmente os endereços da lista de permissões

// ** OPTIONAL **
let CONTRACT_ADDRESS = "YOUR CONTRACT ADDRESS"; // Se você quiser incluí-lo manualmente

// Metadados genéricos são opcionais se você quiser revelar seus NFTs
const GENERIC = false; // Defina como true se você deseja fazer upload de metas genéricas e revelar os NFTs reais no futuro
const GENERIC_TITLE = CONTRACT_NAME; // Substitua pelo que você deseja que os títulos genéricos digam se desejar que seja diferente do nome do contrato.
const GENERIC_DESCRIPTION = "REPLACE THIS"; // Substitua pelo que você deseja que as descrições genéricas digam.
const GENERIC_IMAGE = "https://ipfs.io/ipfs/QmUf9tDbkqnfHkQaMdFWSGAeXwVXWA61pFED7ypx4hcsfh"; // Substitua por sua imagem genérica que será exibida para todas as pré-revelações de NFTs.

// Defina automaticamente o endereço do contrato se implantado usando o script deployContract.js
try {
  const rawContractData = fs.readFileSync(
    `${basePath}/build/contract/_contract.json`
  );
  const contractData = JSON.parse(rawContractData);
  if (contractData.response === "OK" && contractData.error === null) {
    CONTRACT_ADDRESS = contractData.contract_address;
  }
} catch (error) {
  // Não faça nada, voltando ao endereço do contrato manual
}
// END NFTPort Info

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  AUTH,
  LIMIT,
  CONTRACT_ADDRESS,
  OWNER_ADDRESS,
  TREASURY_ADDRESS,
  CHAIN,
  GENERIC,
  GENERIC_TITLE,
  GENERIC_DESCRIPTION,
  GENERIC_IMAGE,
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  METADATA_UPDATABLE,
  ROYALTY_SHARE,
  ROYALTY_ADDRESS,
  MAX_SUPPLY,
  MINT_PRICE,
  TOKENS_PER_MINT,
  PRESALE_MINT_START_DATE,
  PUBLIC_MINT_START_DATE,
  BASE_URI,
  PREREVEAL_TOKEN_URI,
  PRESALE_WHITELISTED_ADDRESSES
};
