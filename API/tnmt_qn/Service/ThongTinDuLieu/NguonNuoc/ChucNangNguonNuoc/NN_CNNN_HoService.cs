﻿using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using tnmt_qn.Data;
using tnmt_qn.Dto;

using System.Security.Claims;

namespace tnmt_qn.Service
{
    public class NN_CNNN_HoService
    {
        private readonly DatabaseContext _context;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContext;

        public NN_CNNN_HoService(DatabaseContext context, IMapper mapper, IHttpContextAccessor httpContext)
        {
            _context = context;
            _mapper = mapper;
            _httpContext = httpContext;
        }
        public async Task<List<NN_CNNN_HoDto>> GetAllCNNN_HoAsync()
        {
            var items = await _context.NN_CNNN_Ho!.Where(d => d.DaXoa == false)
                .OrderBy(d => d.Id)
                .AsQueryable().ToListAsync();

            var ttdlDto = _mapper.Map<List<NN_CNNN_HoDto>>(items);

            return ttdlDto;
        }
        public async Task<bool> SaveAsync(NN_CNNN_HoDto dto)
        {

            var existingItem = await _context.NN_CNNN_Ho!.FirstOrDefaultAsync(d => d.Id == dto.Id && d.DaXoa == false);

            if (existingItem == null || dto.Id == 0)
            {
                var newItem = _mapper.Map<NN_CNNN_Ho>(dto);
                newItem.DaXoa = false;
                newItem.ThoiGianTao = DateTime.Now;
                newItem.TaiKhoanTao = _httpContext.HttpContext?.User.FindFirstValue(ClaimTypes.Name) ?? null;
                _context.NN_CNNN_Ho!.Add(newItem);
            }
            else
            {
                var updateItem = await _context.NN_CNNN_Ho!.FirstOrDefaultAsync(d => d.Id == dto.Id);

                updateItem = _mapper.Map(dto, updateItem);
                updateItem!.ThoiGianSua = DateTime.Now;
                updateItem.TaiKhoanSua = _httpContext.HttpContext?.User.FindFirstValue(ClaimTypes.Name) ?? null;
                _context.NN_CNNN_Ho!.Update(updateItem);
            }

            var res = await _context.SaveChangesAsync();

            return true;
        }


        public async Task<bool> DeleteAsync(int Id)
        {
            var existingItem = await _context.NN_CNNN_Ho!.FirstOrDefaultAsync(d => d.Id == Id && d.DaXoa == false);

            if (existingItem == null) { return false; }

            existingItem!.DaXoa = true;
            _context.NN_CNNN_Ho!.Update(existingItem);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
