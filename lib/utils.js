
// generate new unique id
async function generateNewUniqueId(Model, modelName, prefix) {
  const fieldName = `${modelName.toLowerCase()}Id`;

  const maxCounterDocument = await Model.findOne(
    { [fieldName]: { $regex: new RegExp(`^${prefix}\\d+$`) } },
    { [fieldName]: 1 },
    { sort: { [fieldName]: -1 } }
  ).lean();

  if (maxCounterDocument) {
    const currentCounter = parseInt(maxCounterDocument[fieldName].slice(3));
    return `${prefix}${(currentCounter + 1).toString().padStart(4, '0')}`;
  } else {
    return `${prefix}0001`;
  }
};

module.exports = generateNewUniqueId;