import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

function HomePage(props) {
    console.log(props.meetups)
    return (
        <Fragment>
            <Head>
                <title>Meetup Next App</title>
                <meta name='description' content="This is the home page of my First Next App" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    );
}

// export async function getServerSideProps(context){
//   // usually for things with credentials because it needs to be revaluated every request
//   const req = context.req
//   const res = context.res

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export async function getStaticProps() {
    const client = await MongoClient.connect(
        "mongodb+srv://daniel:J4FhC6yr6MAe4l5i@mycluster.rq3bf.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find().toArray();
    
    client.close();
    return {
        props: {
            meetups: await meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
            revalidate: 1,
        },
    };
}

export default HomePage;
