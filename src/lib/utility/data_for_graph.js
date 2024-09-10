const data_for_profile_graph = (weight, height) => {
  const weight_label = weight.map((w) => w.date);
  const weight_data = weight.map((w) =>
    parseFloat(w.value.split(" ")[0]).toFixed(1)
  );

  const height_label = height.map((h) => h.date);
  const height_data = height.map((h) => 
    parseFloat(h.value.split(" ")[0]).toFixed(1)
  );

  const weight_dataset = {
    label: weight_label,
    data: weight_data,
  };

  const height_dataset = {
    label: height_label,
    data: height_data,
  };

  
  return { weight_dataset, height_dataset };
};

export { data_for_profile_graph };
