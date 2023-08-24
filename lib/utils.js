
// generate new unique id
async function generateNewUniqueId(Schema, idName) {
  const maxCounterDocument = await Customer.findOne(
    { customerId: { $regex: /^CSR\d+$/ } },
    { customerId: 1 },
    { sort: { customerId: -1 } }
  ).lean();

  if (maxCounterDocument) {
    const currentCounter = parseInt(maxCounterDocument.customerId.slice(3));
    return `CSR${(currentCounter + 1).toString().padStart(4, '0')}`;
  } else {
    return 'CSR0001';
  }
};

module.exports = generateNewUniqueId;