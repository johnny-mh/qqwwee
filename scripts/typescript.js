import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import glob from "glob";

const tsconfigJson = `
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

`;

const tsconfigNodeJson = `
{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}

`;

const viteEnvDts = `/// <reference types="vite/client" />
`;

writeFileSync("./tsconfig.json", tsconfigJson);
writeFileSync("./tsconfig.node.json", tsconfigNodeJson);
writeFileSync("./src/vite-env.d.ts", viteEnvDts);

const packageJson = JSON.parse(readFileSync("./package.json").toString());

packageJson.scripts.build = `tsc && vite build`;
packageJson.devDependencies.typescript = `^4.6.4`;

writeFileSync("./package.json.bak", JSON.stringify(packageJson, undefined, 2));

execSync("mv ./vite.config.js ./vite.config.ts");
execSync("mv ./package.json.bak ./package.json");

for (const file of glob.sync("src/**/*.jsx")) {
  const [path] = file.split(".");
  execSync(`mv ${file} ${path}.tsx`);
}

for (const file of glob.sync("src/**/*.js")) {
  const [path] = file.split(".");
  execSync(`mv ${file} ${path}.ts`);
}
