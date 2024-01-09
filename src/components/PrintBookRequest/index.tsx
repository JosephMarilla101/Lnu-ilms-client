/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Font,
} from '@react-pdf/renderer';
import { FileDown } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useGetBookLateFee } from '@/hooks/useBook';
import {
  type RequestStatusType,
  type RequestedBook,
} from '@/hooks/useBookRequest';

type RangeType = {
  startDate?: Date;
  endDate?: Date;
};

type StatusType = RequestStatusType | 'CANCELLED';

export default function PrintBookRequest({
  data,
  range,
  status,
}: {
  data?: RequestedBook[];
  range: RangeType;
  status: StatusType;
}) {
  const getBookLateFee = useGetBookLateFee();

  return (
    <div className='flex items-center underline'>
      <FileDown size={20} className='mr-1 text-primary' />
      <PDFDownloadLink
        className='text-primary'
        document={
          <MyDocument
            data={data}
            getBookLateFee={getBookLateFee}
            status={status}
            range={range}
          />
        }
        fileName={`${status.toString()}` ?? 'document.pdf'}
      >
        {({ loading }) =>
          loading && getBookLateFee.isLoading
            ? 'Loading document...'
            : 'Download PDF'
        }
      </PDFDownloadLink>
    </div>
  );
}

Font.register({
  family: 'Helvetica',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fonts: [],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 10,
    marginTop: 20,
    width: '100%',
    textAlign: 'center',
  },
  thead: {
    fontSize: 12,
    color: 'blue',
  },
  tbody: {
    fontSize: 10,
  },
  id: {
    width: '4%',
    paddingLeft: 5,
    justifyContent: 'center',
  },
  isbn: {
    width: '13%',
    justifyContent: 'center',
  },
  section: {
    width: '23%',
    textAlign: 'left',
    justifyContent: 'center',
  },
  fine: {
    width: '14%',
    justifyContent: 'center',
  },
});

const MyDocument = ({
  data,
  status,
  range,
}: {
  data?: RequestedBook[];
  getBookLateFee: any;
  status: StatusType;
  range?: RangeType;
}) => {
  const getHeaderText = (): string => {
    if (status === 'PENDING') return 'Pending Book Request';
    if (status === 'FORPICKUP') return 'For Pick Up Book Request';
    if (status === 'CANCELLED') return 'Cancelled Book Request';
    if (status === 'DISAPPROVED') return 'Disapproved Book Request';
    else return 'Released Books Request';
  };

  const renderRange = (param: Date) => {
    const date = new Date(param);
    const dateFormat = 'MMM dd yyyy hh:mm a';
    const formattedDate = format(date, dateFormat);

    return formattedDate;
  };

  const renderDate = (param: Date) => {
    const date = parseISO(param.toString());
    const dateFormat = 'MMM dd yyyy hh:mm a';
    const formattedDate = format(date, dateFormat);

    return formattedDate;
  };

  const renderReturnDate = (param: Date) => {
    if (!param) return <Text style={{ color: 'red' }}>Unreturn</Text>;
    const date = parseISO(param.toString());
    const dateFormat = 'MMM dd yyyy hh:mm a';
    const formattedDate = format(date, dateFormat);

    return formattedDate;
  };

  return (
    <Document>
      <Page size='A4' wrap style={styles.page}>
        {/* Header fixed on all pages */}
        <View fixed style={styles.header}>
          <Text style={{ fontWeight: 'bold', color: 'blue', marginBottom: 10 }}>
            {getHeaderText()}
          </Text>

          {range?.startDate && range?.endDate ? (
            <Text style={{ fontSize: 12, color: '#D6A73D' }}>{`${renderRange(
              range.startDate
            )} - ${renderRange(range.endDate)}`}</Text>
          ) : (
            ''
          )}

          {/* <Text
            style={{
              fontWeight: 'bold',
              color: 'blue',
              fontSize: 13,
              textAlign: 'left',
              marginTop: 20,
            }}
          >
            {`#${data?.profile?.id} BOOK ISSUED HISTORY`}
          </Text> */}
        </View>

        <View
          style={{
            flexDirection: 'row',
            borderColor: 'gray',
            borderWidth: '1px',
            paddingVertical: 10,
          }}
        >
          <View style={[styles.id, styles.thead]}>
            <Text>#</Text>
          </View>

          <View style={[styles.isbn, styles.thead]}>
            <Text>ISBN</Text>
          </View>

          <View style={[styles.section, styles.thead]}>
            <Text>Book Name</Text>
          </View>

          <View style={[styles.section, styles.thead]}>
            <Text>Requestor ID</Text>
          </View>

          <View style={[styles.section, styles.thead]}>
            <Text>Request Date</Text>
          </View>

          <View style={[styles.section, styles.thead]}>
            <Text>
              {status === 'CANCELLED'
                ? 'Cancelled Date'
                : status === 'DISAPPROVED'
                ? 'Disapproved Date'
                : status === 'FORPICKUP'
                ? 'Approved Date'
                : status === 'RELEASED'
                ? 'Released Date'
                : 'Updation Date'}
            </Text>
          </View>

          <View style={[styles.fine, styles.thead]}>
            <Text>Status</Text>
          </View>
        </View>

        {data?.map((data, i) => (
          <View
            style={{
              flexDirection: 'row',
              borderColor: 'gray',
              borderWidth: '1px',
              borderTopWidth: '0px',
              paddingVertical: 10,
            }}
          >
            <View style={[styles.id, styles.tbody]}>
              <Text>{i + 1}</Text>
            </View>

            <View style={[styles.isbn, styles.tbody]}>
              <Text>{data?.isbn}</Text>
            </View>

            <View style={[styles.section, styles.tbody]}>
              <Text>{data?.bookName}</Text>
            </View>

            <View style={[styles.section, styles.tbody]}>
              <Text>{data?.studentId}</Text>
            </View>

            <View style={[styles.section, styles.tbody]}>
              <Text>{renderDate(data.requestDate)}</Text>
            </View>

            <View style={[styles.section, styles.tbody]}>
              <Text>
                {status === 'PENDING'
                  ? 'N/A'
                  : renderReturnDate(data.updatedAt)}
              </Text>
            </View>

            <View style={[styles.fine, styles.tbody]}>
              <Text>
                {status === 'CANCELLED'
                  ? 'CANCELLED'
                  : status === 'DISAPPROVED'
                  ? 'DISAPPROVED'
                  : status === 'FORPICKUP'
                  ? 'FOR PICKUP'
                  : status === 'RELEASED'
                  ? 'RELEASED'
                  : 'PENDING'}
              </Text>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
};
