---
title: Windows11上安装PVE
---

创建 `Create-VM.ps1` 文件，内容如下：

```powershell
# 设置新建虚拟机参数
$VM_Name = "Proxmox VE"  # 创建一台名为“Proxmox VE”的虚拟机
$VM_Generation = 1       # 指派新虚拟机代数为“1”或者“2”
$VM_CpuCount = 2         # 指派虚拟处理器数量，请根据宿主机CPU逻辑核心数合理配置
$VM_RAM = 8GB            # 指派新虚拟机启动内存为 8GB
$isDRAM = $false         # 默认 $false 禁用动态内存，启用请定义为 $isDRAM = $true
$MaxDRAM = $VM_RAM       # 最大动态内存，默认等于启动内存，请根据宿主机内存大小及自己的需要修改
$MiniDRAM = 128MB        # 动态内存最小分配值，请根据实际需求分配
$vDiskSize = 128GB       # 指派新虚拟硬盘大小为 128GB
$vSwitch = "waibu"       # 指派网络适配器对应的虚拟交换机为“Internet”，请确保此虚拟交换机已事先创建，否则使用脚本创建的过程会报错导致无法正常创建虚拟机
$VM_Path = "D:\Hyper-V"  # 定义虚拟机存放目录，请确保所在盘符存在
$vDiskPath = "$VM_Path\$VM_Name\Virtual Hard Disks"  # 定义虚拟硬盘存放目录，请确保所在盘符有效
$vISO = "C:\Users\biuax\Downloads\115download\proxmox-ve_8.0-2.iso"  # 指派虚拟机 DVD 驱动器镜像路径（请确保镜像路径真实存在，否则会导致报错而无法创建虚拟机），若无需指派，则此项请留空（而不是删除此变量，否则会导致报错而无法创建虚拟机），即定义为 $vISO = ""


### 如果你想创建的是 Hyper-V 二代虚拟机，请继续设置下列选项，否则请忽略 ###
# 安全启动项，如果不清楚安全启动项的作用请保持默认禁用
$SecBoot = "Off" # 默认为 "Off" 禁用安全启动，启用请修改为 "On"
# 安全启动类型，如不清楚此项作用，请保持上面的安全启动项为默认关闭

# 此项请根据自己需要来注释掉或取消下列几项的注释
# 如果需要安装下述 Microsoft 的系统，可以开启安全启动并设置为 Microsoft Windows 类型，否则一般都是保持默认禁用安全启动
$SecBootTemplate = "MicrosoftWindows" 
# 一般用于安装支持 UEFi 引导的64位 Windows 8/8.1/10 或 Windows Server 2012/2012R2/2016/2019 等
#$SecBootTemplate = "MicrosoftUEFICertificateAuthority"
# 一般用于安装获得 Microsoft UEFi 证书颁发机构 认证的系统
#$SecBootTemplate = "OpenSourceShieldedVM"
# 一般用于安装支持 UEFi 引导启动 受防护的开源 VM


# 新虚拟机参数设置结束



# 开始新建虚拟机……
# 创建虚拟机及虚拟硬盘存放目录
mkdir -Path $VM_Path -ErrorAction SilentlyContinue
mkdir -Path $vDiskPath -ErrorAction SilentlyContinue
# 创建一台 Hyper-V 虚拟机
New-VM -Name $VM_Name -Path $VM_Path -Generation $VM_Generation -MemoryStartupBytes $VM_RAM -NewVHDPath $vDiskPath\$VM_Name.vhdx -NewVHDSizeBytes $vDiskSize -SwitchName $vSwitch
# 配置动态内存上下限
Set-VMMemory -VMName $VM_Name -DynamicMemoryEnabled $true -MaximumBytes $MaxDRAM -MinimumBytes $MiniDRAM
# 启用或禁用动态内存分配功能
Set-VMMemory -VMName $VM_Name -DynamicMemoryEnabled $isDRAM
# 开启 MAC 地址欺骗功能
Set-VMNetworkAdapter -VMName $VM_Name -MacAddressSpoofing On
# 调整虚拟处理器数量，并启用虚拟机嵌套虚拟化支持
Set-VMProcessor -VMName $VM_Name -Count $VM_CpuCount -ExposeVirtualizationExtensions $true
# 其它调整……
if ($VM_Generation -eq 1) {
    # 指派 DVD 驱动器镜像
    Set-VMDvdDrive -VMName $VM_Name -Path $vISO
    # 开机自动启用数字键盘
    Set-VMBios -VMName $VM_Name -EnableNumLock
    # 调整系统引导的启动顺序，如需修改请注意格式
    # 默认从左到右分别对应“IDE 硬盘”、“CD 驱动器”、“旧的网络适配器” 和 “软盘”
    Set-VMBios -VMName $VM_Name -StartupOrder `
    @("IDE", "CD", "LegacyNetworkAdapter", "Floppy")
}
else  {
    # 指派 DVD 驱动器镜像
    Add-VMDvdDrive -VMName $VM_Name
    Set-VMDvdDrive -VMName $VM_Name -Path $vISO
    # 启用或禁用“安全启动”
    Set-VMFirmware -VMName $VM_Name -EnableSecureBoot $SecBoot
    # 设置安全启动类型
    Set-VMFirmware -VMName $VM_Name -SecureBootTemplate $SecBootTemplate
    # 调整系统引导的启动顺序，如需修改请注意格式
    # 默认从上到下分别对应“SCSi 虚拟硬盘”、“DVD 驱动器” 和 “网络适配器”
    Set-VMFirmware -VMName $VM_Name -BootOrder `
    $(Get-VMHardDiskDrive -VMName $VM_Name), ` # 虚拟硬盘
    $(Get-VMDvdDrive -VMName $VM_Name), ` # DVD 驱动器
    $(Get-VMNetworkAdapter -VMName $VM_Name) # 网络适配器
}

# 新虚拟机创建结束……
```

修改其中的：

- $vISO
- $vSwitch

有管理员权限的Powershell中执行上面的文件即可。

![image.png](https://b3logfile.com/file/2023/11/image-hoyNumn.png)

点击右侧 `启动`。

![image.png](https://b3logfile.com/file/2023/11/image-0akyZVk.png)

![image.png](https://b3logfile.com/file/2023/11/image-XD8HEve.png)

这里黑屏的话，先关闭当前 PVE 虚拟机的回话窗口，再按照下图关闭增强会话就可以了。

![image.png](https://b3logfile.com/file/2023/11/image-andQPLp.png)

再次双击 PVE 虚拟机打开会话。

![image.png](https://b3logfile.com/file/2023/11/image-jplvTGM.png)

![image.png](https://b3logfile.com/file/2023/11/image-Xjwfvqw.png)
![image.png](https://b3logfile.com/file/2023/11/image-RHJ9OcK.png)
![image.png](https://b3logfile.com/file/2023/11/image-rEVHRDI.png)
![image.png](https://b3logfile.com/file/2023/11/image-zphB8vT.png)

这里修改文件系统为 `xfs`。

![image.png](https://b3logfile.com/file/2023/11/image-FmAfSt1.png)

![image.png](https://b3logfile.com/file/2023/11/image-4sL5oet.png)

![image.png](https://b3logfile.com/file/2023/11/image-WjueR6b.png)

这里的 `pve.example.invalid` 记得改掉，改成域名的形式，比如 `pve.javer.vip`。

最后会显示出当前PVE安装的配置清单，确认无误后即可开始安装。

![image.png](https://b3logfile.com/file/2023/11/image-CdZ65Kr.png)

等待ing...

![image.png](https://b3logfile.com/file/2023/11/image-9iCoKNA.png)

启动完成，输入账号密码进入系统。

![image.png](https://b3logfile.com/file/2023/11/image-TDKi2gc.png)

## Ref 参考资料

- [瞎折腾，Hyper-V 虚拟 Proxmox VE 再嵌套虚拟化 DSM 6.X - STARGAZER](https://blog.gazer.win/essay/run-dsm-in-pve-virtual-machine-with-hyper-v-nested-virtualization.html)
- [[ Proxmox 折腾手记 ] PVE系统安装 - 哔哩哔哩](https://www.bilibili.com/read/cv17648783/)
- [hyper-v 中安装 PVE 虚拟机 - 掘金](https://juejin.cn/post/7201048368390324282)
- [Proxmox VE 踩坑记录](https://yxz.me/2018/05/20/proxmox-ve-manual/)


