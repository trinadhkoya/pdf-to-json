import pdf_table_extractor from "pdf-table-extractor";
import axios from "axios";
import fs from "fs";
import * as https from "https";

try {
    const remotePdfUrl = 'https://oghwkgfcydjubtkihqio.supabase.co/storage/v1/object/sign/wtally/Invoices/ICDC.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ3dGFsbHkvSW52b2ljZXMvSUNEQy5wZGYiLCJpYXQiOjE3MDI5NjY0NTQsImV4cCI6MTcwMzU3MTI1NH0.P4VtBMjKgtMuyC8DCnSlNFnhgpB8cqIIr8ISilXjuEE&t=2023-12-19T06%3A14%3A14.461Z';
    const localPdfPath = './ICDC.pdf';

    // Disable SSL certificate verification
    const axiosOptions = {
        httpsAgent: new https.Agent({rejectUnauthorized: false})
    };

    // Download the remote PDF file
    axios.get(remotePdfUrl, { ...axiosOptions, responseType: 'arraybuffer' })
        .then(response => {
            console.log(response.data)
            fs.writeFileSync(localPdfPath, Buffer.from(response.data, 'binary'));

            // Extract tables from the downloaded PDF
            pdf_table_extractor(localPdfPath, res => {
                res.pageTables.map(function (item) {
                    console.log(item)
                    return item
                })
            }, function (err) {
                console.log(err)
            });
        })
        .catch(function (error) {
            console.log(error);
        });
} catch (e) {
    console.log(e)
}