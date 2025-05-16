"use client";

import { mailchimp } from "@/app/resources";
import { Button, Flex, Heading, Input, Text, Background, Column, Textarea } from  "@/codemindz/components";
import { opacity, SpacingToken } from "@/codemindz/types";
import { useState } from "react";

function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let timeout: ReturnType<typeof setTimeout>;
  return ((...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  }) as T;
}

type ContactUsProps = {
  display: boolean;
  title: string | JSX.Element;
  description: string | JSX.Element;
};

export const ContactUs = ({ contactus }: { contactus: ContactUsProps }) => {
  const [error, setError] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");

    const contactform = async (e :any) => {
      e.preventDefault();
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, phone, message }),
      });
      const data = await res.json();

      console.log('test for contact',res);
      if (res.ok) {
        console.log('Submit successfully');
      } else {
        console.error('Submit failed');
      }
    };
  const validateEmail = (email: string): boolean => {
    if (email === "") {
      return true;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
    }
  };

  const debouncedHandleChange = debounce(handleChange, 2000);

  const handleBlur = () => {
    setTouched(true);
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
    }
  };

  return (
    <Column
      overflow="hidden"
      fillWidth
      padding="xl"
      radius="l"
      marginBottom="m"
      horizontal="center"
      align="center"
      background="surface"
      border="neutral-alpha-weak"
    >
      <Background
            position="absolute"
            mask={{
              x: mailchimp.effects.mask.x,
              y: mailchimp.effects.mask.y,
              radius: mailchimp.effects.mask.radius,
              cursor: mailchimp.effects.mask.cursor
            }}
            gradient={{
              display: mailchimp.effects.gradient.display,
              opacity: mailchimp.effects.gradient.opacity as opacity,
              x: mailchimp.effects.gradient.x,
              y: mailchimp.effects.gradient.y,
              width: mailchimp.effects.gradient.width,
              height: mailchimp.effects.gradient.height,
              tilt: mailchimp.effects.gradient.tilt,
              colorStart: mailchimp.effects.gradient.colorStart,
              colorEnd: mailchimp.effects.gradient.colorEnd,
            }}
            dots={{
              display: mailchimp.effects.dots.display,
              opacity: mailchimp.effects.dots.opacity as opacity,
              size: mailchimp.effects.dots.size as SpacingToken,
              color: mailchimp.effects.dots.color,
            }}
            grid={{
              display: mailchimp.effects.grid.display,
              opacity: mailchimp.effects.grid.opacity as opacity,
              color: mailchimp.effects.grid.color,
              width: mailchimp.effects.grid.width,
              height: mailchimp.effects.grid.height,
            }}
            lines={{
              display: mailchimp.effects.lines.display,
              opacity: mailchimp.effects.lines.opacity as opacity,
              size: mailchimp.effects.lines.size as SpacingToken,
              thickness: mailchimp.effects.lines.thickness,
              angle: mailchimp.effects.lines.angle,
              color: mailchimp.effects.lines.color,
            }}
          />
      <Heading style={{ position: "relative" }} marginBottom="s" variant="display-strong-xs">
        {contactus.title}
      </Heading>
      <Text
        style={{
          position: "relative",
          maxWidth: "var(--responsive-width-xs)",
        }}
        wrap="balance"
        marginBottom="l"
        onBackground="neutral-medium"
      >
        {contactus.description}
      </Text>
      <form
        style={{
          width: "100%",
          display: "flex",
          // justifyContent: "center",
          flexDirection : "column",
          gap:"15px",
        }}
        // action={mailchimp.action}
        onSubmit={contactform}
        method="post"
        id="cmd-embedded-subscribe-form"
        name="cmd-embedded-subscribe-form"
      >
         {/*<Flex id="mc_embed_signup_scroll" fillWidth maxWidth={90} mobileDirection="column" gap="8">*/}
          <Input
            formNoValidate
            labelAsPlaceholder
            id="cmd-user-name"
            name="name"
            type="text"
            label="Name"
            required
            onChange={e => setUsername(e.target.value)}
            onBlur={handleBlur}
            errorMessage={error}
          />
          <Input
            formNoValidate
            labelAsPlaceholder
            id="cmd-EMAIL"
            name="EMAIL"
            type="email"
            label="Email"
            required
            onChange={e => setEmail(e.target.value)}
            onBlur={handleBlur}
            errorMessage={error}
          />
          <Input
            formNoValidate
            labelAsPlaceholder
            id="cmd-phone"
            name="phone"
            type="text"
            label="Phone"
            required
            onChange={e => setPhone(e.target.value)}
            onBlur={handleBlur}
            errorMessage={error}
          />
          <Textarea
            labelAsPlaceholder
            id="cmd-message"
            name="message"
            label="Message"
            lines={4}
            required
            onChange={e => setMessage(e.target.value)}
            onBlur={handleBlur}
            errorMessage={error}
          />
          <div style={{ display: "none" }}>
            <input
              type="checkbox"
              readOnly
              name="group[3492][1]"
              id="mce-group[3492]-3492-0"
              value=""
              checked
            />
          </div>
          <div id="mce-responses" className="clearfalse">
            <div className="response" id="mce-error-response" style={{ display: "none" }}></div>
            <div className="response" id="mce-success-response" style={{ display: "none" }}></div>
          </div>
          <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
            <input
              type="text"
              readOnly
              name="b_c1a5a210340eb6c7bff33b2ba_0462d244aa"
              tabIndex={-1}
              value=""
            />
          </div>
          <div className="clear">
            <Flex height="48" vertical="center">
              <Button id="mc-embedded-subscribe" type="submit" value="Subscribe" size="m" fillWidth>
                Submit
              </Button>
            </Flex>
          </div>
         {/*</Flex>*/}
      </form>
    </Column>
  );
};
