import React, { useState, useEffect } from 'react'
import products from '../products.json'
import {  Container,  Pagination,  Stack } from 'react-bootstrap'
import ProductCard from './ProductCard'
import { useProducts } from '../hooks/useProducts'
import { getToken } from "../service/StorageService";
import useNavigateToPages from '../hooks/useNavigateToPages'

const Products = () => {
    const {naviagteToLogin} = useNavigateToPages()
    const { data, error, loading } = useProducts()

    const [curretPage, setCurrentpage] = useState<number>(1)
    const itemsPerPage = 5

    const lastItemIndex = curretPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage
    const currentProductSet = products.slice(firstItemIndex,lastItemIndex)

    const handleCurrentPage = (pageNumber: number)=> setCurrentpage(pageNumber)

    useEffect(()=>{
      const token = getToken();
      let isMounted = true;
      if(token && token.length === 0 && isMounted){
        console.log('products effect')
        naviagteToLogin()
      }
      return () => {
        isMounted = false
      }
    }, []);

    const totalPages = Math.ceil(products.length/itemsPerPage)
    const paginationItems = []
    for(let page=1; page <= totalPages; page++ ){
        paginationItems.push(
            <Pagination.Item
                key={page}
                active={page === curretPage}
                onClick={()=>handleCurrentPage(page)}
                >
                    {page}
                </Pagination.Item>
        )
    }




  return (
    <Container className="mt-5">
      <Stack>
          <h3 className="mb-4">Products</h3>
            {currentProductSet.map((item, index) => (
              <ProductCard key={index} product={item}/>
            ))}
          <Pagination className="mt-4">{paginationItems}</Pagination>
      </Stack>
    </Container>
  )
}

export default Products