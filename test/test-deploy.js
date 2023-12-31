const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", function () {
  let simpleStorageFactory;
  let simpleStorage;
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Should start with a favourite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    // assert || expect
    // assert.equal(currentValue.toString(), expectedValue);
    expect(currentValue.toString()).to.equal(expectedValue);
  });

  it("Should update when we call store", async function () {
    const expectedValue = "77";
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  });

  it("Should show person when we call", async function () {
    const expectedPersonLength = "1";
    const transactionResponse = await simpleStorage.addPerson("Vaibhav", 77);
    await transactionResponse.wait(1);
    const currentPersonLength = await simpleStorage.getPeopleLength();
    assert.equal(currentPersonLength.toString(), expectedPersonLength);
  });
});
