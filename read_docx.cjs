const mammoth = require("mammoth");
const fs = require("fs");

async function convert(inputFile) {
    try {
        const result = await mammoth.extractRawText({path: inputFile});
        const text = result.value;
        const messages = result.messages;
        fs.writeFileSync(inputFile + ".txt", text);
        console.log(`Successfully converted ${inputFile}`);
    } catch(err) {
        console.error(`Error converting ${inputFile}:`, err);
    }
}

convert("Final-Project and Marking Rubric 2026 Block-02 (1).docx");
convert("TechCart_Design_Project_Report_Dhruv_Garg.docx");
