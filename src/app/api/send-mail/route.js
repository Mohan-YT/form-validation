import nodemailer from 'nodemailer'


export  async function POST(req){

    try{

        if(!req) return new Response(JSON.stringify({ error: 'Failed to request' }), { status: 500 }) ;


        const body = await req.json();

        const {firstName, lastName, age, email, password} = body;

        console.log('Form Data:', body);
        console.log('Email:', process.env.USER_EMAIL); 
        console.log('Password:', process.env.USER_PASS);

        const transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user : process.env.USER_EMAIL,
                pass : process.env.USER_PASS
            }
        })

        //Admin Notification Email
        await transporter.sendMail({
            from : `Form Submission <${process.env.USER_EMAIL}>`,
            to : process.env.USER_EMAIL,  //admin email
            subject : "New Form Submission",

            html: `
            <h3>New Form Submission</h3>
            <p><strong>First Name:</strong> ${firstName}</p>
            <p><strong>Last Name:</strong> ${lastName}</p>
            <p><strong>Age:</strong> ${age}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Password:</strong> ${password}</p>
          `
        })

        // send  resonse to user

        await transporter.sendMail({
            from : 'Developer',
            to : email, //usr mail from form
            subject : 'Thank You for Your Submission!',

            html: `
            <h2> Thank You, ${firstName}!</h2>
            <p>We have received your form submission successfully.</p>
            <p>Here are your details:</p>
            <ul>
              <li><strong>Name:</strong> ${firstName} ${lastName}</li>
              <li><strong>Age:</strong> ${age}</li>
              <li><strong>Email:</strong> ${email}</li>
            </ul>
            <p>We will contact you shortly.</p>
            <p>Best regards,<br><strong>Hotal Chef Team</strong></p>
          `
        })

        return new Response(JSON.stringify({ message: 'Emails sent successfully' }), { status: 200 });


    }catch(e){
        console.log(e.message)
        return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });

    }
}