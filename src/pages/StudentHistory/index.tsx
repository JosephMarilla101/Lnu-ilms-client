import ColumnsFunction from './TableColumns';
import DataTable from '@/components/DataTable';
import { useParams } from 'react-router-dom';
import {
  useGetStudentBorrowedBooks,
  StudentWithBorrowedBook,
} from '@/hooks/useUser';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
} from '@react-pdf/renderer';
import { FileDown } from 'lucide-react';
// import { differenceInDays, format, isAfter, parseISO } from 'date-fns';

export default function StudentHistory() {
  const { id } = useParams();
  const borrowedBooks = useGetStudentBorrowedBooks(id);
  const columns = ColumnsFunction();

  if (borrowedBooks.isError) return null;

  return (
    <div className='container mx-auto py-10'>
      <h1 className='text-primary text-2xl font-medium text-center'>
        {borrowedBooks.data?.profile?.fullname}
      </h1>
      <span className='block text-center text-secondary mb-4'>
        #{borrowedBooks.data?.profile?.id} {borrowedBooks.data?.profile?.course}
        ({borrowedBooks.data?.profile?.college})
      </span>

      <h2 className='hidden md:block -mb-14 text-primary text-lg'>
        #{borrowedBooks.data?.profile?.id} BOOK ISSUED HISTORY
      </h2>

      <PrintButton data={borrowedBooks.data} />

      <DataTable
        columns={columns}
        data={borrowedBooks.data?.borrowedBooks ?? []}
        loading={borrowedBooks.isLoading}
      />

      <PDFViewer>
        <MyDocument />
      </PDFViewer>
    </div>
  );
}

function PrintButton({ data }: { data?: StudentWithBorrowedBook }) {
  return (
    <div className='flex items-center underline'>
      <FileDown size={20} className='mr-1 text-primary' />
      <PDFDownloadLink
        className='text-primary'
        document={<MyDocument data={data} />}
        fileName='document.pdf'
      >
        {({ loading }) => (loading ? 'Loading document...' : 'Download pdf')}
      </PDFDownloadLink>
    </div>
  );
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
  },
  header: {
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
  },
  thead: {
    fontSize: 12,
  },
  id: {
    width: '5%',
    paddingLeft: 5,
  },
  section: {
    width: '19%',
    textAlign: 'left',
  },
});

const MyDocument = ({ data }: { data?: StudentWithBorrowedBook }) => {
  return (
    <Document>
      <Page size='A4' wrap style={styles.page}>
        {/* Header fixed on all pages */}
        <View fixed style={styles.header}>
          <Text>Jake Rosales</Text>
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

          <View style={[styles.section, styles.thead]}>
            <Text>ISBN #</Text>
          </View>

          <View style={[styles.section, styles.thead]}>
            <Text>Book Name</Text>
          </View>

          <View style={[styles.section, styles.thead]}>
            <Text>Issued Date</Text>
          </View>

          <View style={[styles.section, styles.thead]}>
            <Text>Returned Date</Text>
          </View>

          <View style={[styles.section, styles.thead]}>
            <Text>Fine (if any)</Text>
          </View>
        </View>

        {data?.borrowedBooks?.map((data, i) => (
          <View
            style={{
              flexDirection: 'row',
              borderColor: 'gray',
              borderWidth: '1px',
              borderTopWidth: '0px',
              paddingVertical: 10,
            }}
          >
            <View style={[styles.id, styles.thead]}>
              <Text>{i}</Text>
            </View>

            <View style={[styles.section, styles.thead]}>
              <Text>{data?.book?.isbn}</Text>
            </View>

            <View style={[styles.section, styles.thead]}>
              <Text>{data?.book?.name}</Text>
            </View>

            <View style={[styles.section, styles.thead]}>
              <Text>Issued Date</Text>
            </View>

            <View style={[styles.section, styles.thead]}>
              <Text>Returned Date</Text>
            </View>

            <View style={[styles.section, styles.thead]}>
              <Text>Fine (if any)</Text>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
};
