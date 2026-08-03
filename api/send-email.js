import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
  }

  try {

    const { to, subject, html } = req.body;


    if (!to || !subject || !html) {
      return res.status(400).json({
        success: false,
        message: "Email, subject and message are required.",
      });
    }


    const { data, error } = await resend.emails.send({

      from:
        "College Lost & Found <onboarding@resend.dev>",

      to: [to],

      subject,

      html,

    });


    if (error) {

      console.error("Resend Error:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }


    return res.status(200).json({

      success: true,

      message:
        "Email sent successfully.",

      emailId: data.id,

    });


  } catch (error) {

    console.error(
      "Server Error:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        "Failed to send email.",

      error:
        error.message,

    });

  }

}