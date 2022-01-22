import { Fragment } from "react";
import { getEventById, getFeaturedEvents } from "../../helpers/api-utils";
import EventSummary from "../../components/events/event-summary";
import EventLogistics from "../../components/events/event-logistics";
import EventContent from "../../components/events/event-content";
import ErrorAlert from "../../components/ui/error-alert";

function EventDetailPage(props) {
    const event = props.selectedEvent;

    if (!event) {
        return (
            <Fragment>
                <ErrorAlert>
                    <h2>Page not found</h2>
                </ErrorAlert>
            </Fragment>
        );
    }
    return (
        <Fragment>
            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    );
}

export async function getStaticProps(context) {
    const eventId = context.params.eventId;
    const event = await getEventById(eventId);
    return {
        props: {
            selectedEvent: event,
        },
        revalidate: 30,
    };
}

export async function getStaticPaths() {
    const allEvents = await getFeaturedEvents();
    const paths = allEvents.map((event) => ({ params: { eventId: event.id } }));
    return {
        paths: paths,
        fallback: true,
    };
}

export default EventDetailPage;
