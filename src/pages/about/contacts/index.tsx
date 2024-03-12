import React, { memo } from "react";
import { AppHead } from "@/components/AppHead";
import { GetStaticPropsResult, GetStaticPropsContext } from "next";

type ContactsProps = {
  contacts: {
    email: string;
    phone: string;
  };
};

const Contacts = memo(({ contacts }: ContactsProps) => {
  return (
    <>
      <AppHead title="Contacts" description="" />
      <h2>Contacts</h2>
      <div>{contacts.email}</div>
      <div>{contacts.phone}</div>
    </>
  );
});
Contacts.displayName = "Contacts";

export default Contacts;

export async function getStaticProps({}: GetStaticPropsContext<{}>): Promise<
  GetStaticPropsResult<ContactsProps>
> {
  // Accesso al DB Fake
  const contacts = {
    email: "test@test.com",
    phone: "1234567890",
  };
  return {
    props: {
      contacts,
    },
    revalidate: 100,
    // in seconds, it is static in BUILD but it updates the values every 100 seconds in this case.
    // Better for performance on data that doesn't change often.
  };
}
