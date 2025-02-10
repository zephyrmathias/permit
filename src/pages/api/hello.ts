// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import {AnnotationFactory} from 'annotpdf';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {

  async function findComments() {
      // console.log(process.cwd() + '/public/interview_permit_pdf.pdf')
  const factory = await AnnotationFactory.loadFile(process.cwd() + '/public/interview_permit_pdf.pdf')
  console.log(factory)
  }

  findComments()

  res.status(200).json({ name: "John Doe" });
}
