function generateTableColumns(config) {
  return config.fields.map(field => ({
    key: field.key,
    label: field.label,
  }));
}

function generateTableRows(data, config) {
  return data.map(item => {
    const row = {};
    config.fields.forEach(field => {
      row[field.key] = item[field.key] ?? '—';
    });
    row.id = item.id ?? item.key ?? Math.random();
    return row;
  });
}
export {
  generateTableColumns,
  generateTableRows
};