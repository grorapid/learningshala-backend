/**
 * sk-lead-form controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::sk-lead-form.sk-lead-form",
  ({ strapi }) => ({
    async create(ctx) {
      const response = await super.create(ctx);
      const { fullname, email, mobile_number } = response?.data?.attributes;
      console.log(response);
      if (response) {
        try {
          const emailOptions = {
            to: "techplatformx@gmail.com",
            from: "grorapid@gmail.com",
            subject: `New Lead Alert ${fullname}`,
            text: "I'm pleased to inform you that we have a new lead in our pipeline, and I wanted to share the details with you. ",
            html: `<h4>Dear Team,<h4>
            <h4>I'm pleased to inform you that we have a new lead in our pipeline, and I wanted to share the details with you.</h4>
            <p> Name: ${fullname} <p> 
            <p> Email : ${email}</p>
            <p> Contact Number : ${mobile_number}</p>
            <h4>Best regards,<h4>
            <h4>Learningshala</h4>             `,
          };
          await strapi.plugin("email").service("email").send(emailOptions);
          strapi.log.debug(`Email sent`);
          //ctx.send({ message: "Email sent" });
        } catch (e) {
          console.log(e);
          strapi.log.debug(e);
          //ctx.send({ error: "Error sending email" });
        }
      }

      return response;
    },
  })
);
