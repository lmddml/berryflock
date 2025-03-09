import { Customer, Unit } from "./types.ts";

const fetchCustomers = async () => {
  try {
    const response = await fetch("http://localhost:8000/customers");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const fetchCustomerById = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:8000/customers/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const insertCustomer = async (customer: Omit<Customer, "id">) => {
  const response = await fetch("http://localhost:8000/customers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json() as Customer;
};

const updateCustomer = async (customer: Customer) => {
  const response = await fetch(
    `http://localhost:8000/customers/${customer.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    },
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json() as Customer;
};

const deleteCustomer = async (id: number) => {
  const response = await fetch(`http://localhost:8000/customers/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json() as Customer;
};

const fetchUnits = async () => {
  try {
    const response = await fetch("http://localhost:8000/units");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const fetchUnitById = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:8000/units/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const insertUnit = async (unit: Omit<Unit, "id">) => {
  const response = await fetch("http://localhost:8000/units", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(unit),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json() as Unit;
};

const updateUnit = async (unit: Unit) => {
  const response = await fetch(
    `http://localhost:8000/units/${unit.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(unit),
    },
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json() as Unit;
};

const deleteUnit = async (id: number) => {
  const response = await fetch(`http://localhost:8000/units/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json() as Unit;
};

const customers = {
  fetchCustomers,
  fetchCustomerById,
  insertCustomer,
  updateCustomer,
  deleteCustomer,
};

const units = {
  fetchUnits,
  fetchUnitById,
  insertUnit,
  updateUnit,
  deleteUnit,
};

export { customers, units };