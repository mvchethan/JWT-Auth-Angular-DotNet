using AuthApi.Context;
using AuthApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;

namespace AuthApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly AppDbContext _appDbContext;
        public UserController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();

            var user = await _appDbContext.Users.FirstOrDefaultAsync(x => x.UserName == userObj.UserName && x.Password == userObj.Password);
            if(user == null)
                return NotFound(new {Message="User Not Found!" });

            return Ok(new
            {
                Message = "Login Success!"
            });
        }

        [HttpPost("registeruser")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if(userObj == null)
                return BadRequest();

            await _appDbContext.Users.AddAsync(userObj);
            await _appDbContext.SaveChangesAsync();
            return Ok(new
            {
                Message= "User Registered!"
            });
        }
    }
}
