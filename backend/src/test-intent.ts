import { detectIntent } from "./services/intent.service";

console.log(
  detectIntent("Show monthly applications")
);

console.log(
  detectIntent("Which branch has the highest rejection rate?")
);

console.log(
  detectIntent("Compare Retail and SME applications")
);

console.log(
  detectIntent("Show top customers by transaction value")
);