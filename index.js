import pdf_table_extractor from "pdf-table-extractor";
import axios from "axios";
import fs from "fs";
import * as https from "https";

try {
    const REMOTE_PDF_URL = '<your_remote_pdf_link_url>';
    const LOCAL_PDF_PATH = './ICDC.pdf';

    // Disable SSL certificate verification
    const axiosOptions = {
        httpsAgent: new https.Agent({rejectUnauthorized: false})
    };

    // Download the remote PDF file
    axios.get(REMOTE_PDF_URL, {...axiosOptions, responseType: 'arraybuffer'})
        .then(response => {
            fs.writeFileSync(LOCAL_PDF_PATH, Buffer.from(response.data, 'binary'));
            // Extract tables from the downloaded PDF
            pdf_table_extractor(LOCAL_PDF_PATH, res => {
                res?.pageTables?.map(item => item)
            }, err => {
                console.log(err)
            });
        })
        .catch(error => {
            console.log(error);
        });
} catch (e) {
    console.log(e)
}
