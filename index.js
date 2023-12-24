import pdf_table_extractor from "pdf-table-extractor";
import axios from "axios";
import fs from "fs";
import * as https from "https";

try {
    const REMOTE_PDF_URL = 'https://oghwkgfcydjubtkihqio.supabase.co/storage/v1/object/sign/wtally/Invoices/ICDC.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ3dGFsbHkvSW52b2ljZXMvSUNEQy5wZGYiLCJpYXQiOjE3MDI5NjY0NTQsImV4cCI6MTcwMzU3MTI1NH0.P4VtBMjKgtMuyC8DCnSlNFnhgpB8cqIIr8ISilXjuEE&t=2023-12-19T06%3A14%3A14.461Z';
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