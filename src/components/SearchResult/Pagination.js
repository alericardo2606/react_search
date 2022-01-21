import React from 'react';

export default ({ data, setPage }) => {
    if (data) {
        const {
            prev, next, pages, range,
        } = data.pagination;

        const current = data.params === null ? 1 : data.params.currentpage;
        return (
            <div className="pagination">
                <nav aria-label="Paginación de los resultados de búsqueda">
                    <ul className="pagination-content">
                        <li className="pagination-item pagination-results">
              <span>
                Page
                  {current}
                  {' '}
                  of
                  {pages}
              </span>
                        </li>
                        {prev ? <li onClick={() => setPage(1)} className="pagination-item pagination-first"><button aria-label="First page" /></li> : null}
                        {prev ? <li onClick={() => setPage((p) => (p > 1 ? p - 1 : p))} className="pagination-item pagination-prev"><button aria-label="Previus" /></li> : null}
                        {range.map((page) => <li key={`page-picker-${page}`} onClick={() => setPage(page)} className={`pagination-item ${current === page ? 'pagination-item-active' : ''}`}><button aria-label={`Page ${page}`}>{page}</button></li>)}
                        {next ? <li onClick={() => setPage((p) => (p < pages ? p + 1 : p))} className="pagination-item pagination-next"><button aria-label="Next page" /></li> : null}
                        {next ? <li onClick={() => setPage(pages)} className="pagination-item pagination-last"><button aria-label="Last page" /></li> : null}
                    </ul>
                </nav>
            </div>
        );
    }
    return null;
};
