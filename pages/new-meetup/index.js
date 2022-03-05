import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from 'next/head'
import { Fragment } from "react";
function NewMeetupPage() {
    const router = useRouter();
    async function addMeetupHandler(enteredMeetupData) {
        const response = await fetch("/api/new-meetup", {
            method: "POST",
            body: JSON.stringify(enteredMeetupData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();

        router.push("/");
    }
    return (
        <Fragment>
            <Head>
                <title>New Meetup</title>
                <meta name='description' content="This is page to add a new meetup in my First Next App" />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </Fragment>
    );
}

export default NewMeetupPage;
