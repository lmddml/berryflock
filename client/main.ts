import * as client from "./client.ts";

async function main() {
  console.log("Hello, Deno!");
  const units = await client.units.fetchUnits();
  for (const unit of units) {
    await client.units.deleteUnit(unit.id);
  }

  const newUnit = {
    name: "meter",
    plural: "meters",
    abbreviation: "m",
  };
  const insertedUnit = await client.units.insertUnit(newUnit);

  const units2 = await client.units.fetchUnits();
  const unit = await client.units.fetchUnitById(insertedUnit.id);
  console.log({ units, units2, unit });
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  await main();
  console.log("Done!");
}