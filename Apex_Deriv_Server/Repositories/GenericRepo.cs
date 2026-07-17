using System;
using Apex_Deriv_Server.DataContext;
using Apex_Deriv_Server.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Apex_Deriv_Server.Repositories
{
    public class GenericRepo<T>(ApexContext context) : IGenericRepo<T> where T : class
    {
        private readonly ApexContext _context = context;
        private readonly DbSet<T> _dbSet = context.Set<T>();

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<T?> GetByIdAsync(string id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public void Update(T entity)
        {
            _dbSet.Update(entity);
        }

        public void Delete(T entity)
        {
            _dbSet.Remove(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}