import Form from 'next/form'
import { Search } from 'lucide-react'
import SearchFormReset from './SearchFormReset'

export default function SearchForm({ query }: { query: string }) {

  return (
    <Form action='/' className='search-form'>
      <input type="text" name='query' className='search-input' placeholder='Search Startups' value={query} />
      <div className='flex gap-2'>
        {query && <SearchFormReset />}
        <button type='submit' className='search-btn text-white'><Search className='size-5'/></button>
      </div>

    </Form>
  )
}