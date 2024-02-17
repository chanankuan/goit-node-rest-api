// Function to replace placeholders with variables
export const replacePlaceholders = (template, variables) => {
  let emailContent = template;
  Object.keys(variables).forEach(key => {
    const placeholder = new RegExp(`{{${key}}}`, 'g');
    emailContent = emailContent.replace(placeholder, variables[key]);
  });
  return emailContent;
};
