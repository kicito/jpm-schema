import { expect } from "chai";
import Validator from "../src/validate";
import testFiles from "./file";
const examplePackageJsons: {
  name: string;
  expectedResult: boolean;
  args: {
    [x: string]: {};
  };
}[] = [
  {
    name: "minimal package json (from starter template)",
    expectedResult: true,
    args: {
      name: "packagename1",
      version: "version",
      description: "",
      main: "app.js",
      author: "Joe Don",
      license: "ISC",
      dependencies: {},
      jpm: {},
    },
  },
  {
    name: "minimal package json with empty jolieDependency",
    expectedResult: false,
    args: {
      name: "packagename2",
      version: "version",
      description: "",
      main: "app.js",
      author: "Joe Don",
      license: "ISC",
      dependencies: {},
      jpm: {
        jolieDependency: {},
      },
    },
  },
  {
    name: "minimal valid package json with jolieDependency",
    expectedResult: true,
    args: {
      name: "packagename3",
      version: "version",
      description: "",
      main: "app.js",
      author: "Joe Don",
      license: "ISC",
      dependencies: {},
      jpm: {
        jolieDependency: {
          a: "1.0.0",
        },
      },
    },
  },
  {
    name: "minimal valid package json with mavenDependency",
    expectedResult: true,
    args: {
      name: "packagename3",
      version: "version",
      description: "",
      main: "app.js",
      author: "Joe Don",
      license: "ISC",
      dependencies: {},
      jpm: {
        mavenDependency: {
          "mvn-art:group:version": "1.0.0",
        },
      },
    },
  },
  {
    name: "minimal valid package json with mavenPeerDependency",
    expectedResult: true,
    args: {
      name: "packagename3",
      version: "version",
      description: "",
      main: "app.js",
      author: "Joe Don",
      license: "ISC",
      dependencies: {},
      jpm: {
        mavenDependency: {
          "mvn-art:group:version": "1.0.0",
        },
        mavenIndirectDependency: {
          "mvn-peer-art:group:version": "1.0.0",
        },
      },
    },
  },
];

describe("validator", () => {
  describe("jsonObject", () => {
    for (const test of examplePackageJsons) {
      it(test.name, () => {
        if (test.expectedResult) {
          expect(Validator.validate(test.args)).to.be.true;
        } else {
          expect(() => Validator.validate(test.args)).to.throw();
        }
      });
    }
  });

  describe("files", () => {
    const files = testFiles;
    for (const test of files) {
      it(test, () => {
        expect(Validator.validateFile(test)).to.be.true;
      });
    }
  });
});
