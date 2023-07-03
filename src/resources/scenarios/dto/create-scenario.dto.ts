export class CreateScenarioDto {
  cardNumber: string;
  cardReviwer: string;
  cardHolder: string;
  sprint: string;
  scenarios: [
    {
      testcaseName: string;
      testcaseDescription: {
        dado: string;
        quando: string;
        entao: string;
      };
    },
  ];
}
