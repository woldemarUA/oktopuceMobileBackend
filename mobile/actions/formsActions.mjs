export function generateFormConfig(model) {
  const fields = {};

  for (const [key, value] of Object.entries(model.rawAttributes)) {
    fields[key] = {
      type: value.type.key,
      required: !value.allowNull,
      unique: value.unique || false,
      references: value.references || false,
    };
  }

  return fields;
}
