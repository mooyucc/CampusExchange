import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('开始添加示例数据...');

  // 创建示例用户
  const hashedPassword = await bcrypt.hash('password123', 10);

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'alice@example.com' },
      update: {},
      create: {
        name: 'Alice',
        email: 'alice@example.com',
        password: hashedPassword,
        grade: 'Grade 10',
      },
    }),
    prisma.user.upsert({
      where: { email: 'bob@example.com' },
      update: {},
      create: {
        name: 'Bob',
        email: 'bob@example.com',
        password: hashedPassword,
        grade: 'Grade 11',
      },
    }),
    prisma.user.upsert({
      where: { email: 'charlie@example.com' },
      update: {},
      create: {
        name: 'Charlie',
        email: 'charlie@example.com',
        password: hashedPassword,
        grade: 'Grade 9',
      },
    }),
    prisma.user.upsert({
      where: { email: 'diana@example.com' },
      update: {},
      create: {
        name: 'Diana',
        email: 'diana@example.com',
        password: hashedPassword,
        grade: 'Grade 12',
      },
    }),
  ]);

  console.log('已创建示例用户');

  // 删除所有现有物品（可选，用于重置）
  await prisma.item.deleteMany({});
  console.log('已清空现有物品');

  // 书籍类物品
  const books = [
    {
      title: '高中数学必修一（人教版）',
      description: '高二用过的数学教材，保存完好，有少量笔记，适合预习或复习使用。',
      category: '书籍',
      condition: '良好',
      ownerId: users[0].id,
      images: JSON.stringify([]),
      status: 'available',
    },
    {
      title: '英语词汇3500（高考必备）',
      description: '全新未使用的英语词汇书，高考必备词汇，按字母顺序排列，方便查找。',
      category: '书籍',
      condition: '全新',
      ownerId: users[1].id,
      images: JSON.stringify([]),
      status: 'available',
    },
    {
      title: '物理实验手册',
      description: '高一物理实验手册，包含所有基础实验步骤和说明，适合需要补做实验的同学。',
      category: '书籍',
      condition: '良好',
      ownerId: users[2].id,
      images: JSON.stringify([]),
      status: 'available',
    },
    {
      title: 'SAT考试指南（2023版）',
      description: 'SAT考试完整指南，包含题型分析和答题技巧，有部分标注但不影响使用。',
      category: '书籍',
      condition: '一般',
      ownerId: users[3].id,
      images: JSON.stringify([]),
      status: 'available',
    },
    {
      title: '化学元素周期表手册',
      description: '便携式化学元素周期表，包含元素详细信息和常用数据，适合化学学习。',
      category: '书籍',
      condition: '全新',
      ownerId: users[0].id,
      images: JSON.stringify([]),
      status: 'available',
    },
    {
      title: '世界历史课本（IB课程）',
      description: 'IB世界历史课程教材，内容完整，有部分笔记和标记，适合IB学生使用。',
      category: '书籍',
      condition: '良好',
      ownerId: users[1].id,
      images: JSON.stringify([]),
      status: 'available',
    },
    {
      title: '托福词汇红宝书',
      description: '托福考试词汇书籍，全新未拆封，适合准备托福考试的同学。',
      category: '书籍',
      condition: '全新',
      ownerId: users[2].id,
      images: JSON.stringify([]),
      status: 'available',
    },
    {
      title: '生物实验报告模板集',
      description: '整理好的生物实验报告模板集合，包含各种常见实验格式，可节省时间。',
      category: '书籍',
      condition: '良好',
      ownerId: users[3].id,
      images: JSON.stringify([]),
      status: 'available',
    },
  ];

  // 学习用品类物品
  const supplies = [
    {
      title: '活页笔记本（5本装）',
      description: 'A4大小活页笔记本，共5本，全新未使用，可替换内页，适合做课堂笔记。',
      category: '文具',
      condition: '全新',
      ownerId: users[0].id,
      images: JSON.stringify([]),
      status: 'available',
    },
    {
      title: '科学计算器（TI-84 Plus）',
      description: '德州仪器科学计算器，功能完整，使用正常，适合数学和科学课程使用。',
      category: '文具',
      condition: '良好',
      ownerId: users[1].id,
      images: JSON.stringify([]),
      status: 'available',
    },
    {
      title: '彩色荧光笔套装（10色）',
      description: '10支装荧光笔套装，颜色齐全，适合标记重点和做笔记，使用过一次。',
      category: '文具',
      condition: '良好',
      ownerId: users[2].id,
      images: JSON.stringify([]),
      status: 'available',
    },
    {
      title: '绘图工具套装',
      description: '包含尺子、圆规、量角器、三角板的绘图工具套装，适合数学和美术课使用。',
      category: '文具',
      condition: '全新',
      ownerId: users[3].id,
      images: JSON.stringify([]),
      status: 'available',
    },
    {
      title: '索引贴和标签纸组合',
      description: '大量索引贴和标签纸，不同颜色和尺寸，适合书籍标记和笔记分类。',
      category: '文具',
      condition: '全新',
      ownerId: users[0].id,
      images: JSON.stringify([]),
      status: 'available',
    },
    {
      title: '文件袋和文件夹（整理套装）',
      description: '多个文件袋和文件夹组合，适合整理各科作业和试卷，保持桌面整洁。',
      category: '文具',
      condition: '良好',
      ownerId: users[1].id,
      images: JSON.stringify([]),
      status: 'available',
    },
    {
      title: '修正带和橡皮擦组合',
      description: '多支修正带和各种橡皮擦，全新未使用，适合日常作业和考试使用。',
      category: '文具',
      condition: '全新',
      ownerId: users[2].id,
      images: JSON.stringify([]),
      status: 'available',
    },
    {
      title: '书立和书架收纳盒',
      description: '桌面书立和书架收纳盒，可整理书籍和文具，保持学习环境整洁有序。',
      category: '文具',
      condition: '良好',
      ownerId: users[3].id,
      images: JSON.stringify([]),
      status: 'available',
    },
    {
      title: '透明文件保护套（A4）',
      description: '大量透明文件保护套，A4尺寸，适合保存重要文件和作业，防止磨损。',
      category: '文具',
      condition: '全新',
      ownerId: users[0].id,
      images: JSON.stringify([]),
      status: 'available',
    },
    {
      title: '学习计划本和待办清单',
      description: '专门设计的学期计划本和待办清单本，帮助规划和跟踪学习任务。',
      category: '文具',
      condition: '全新',
      ownerId: users[1].id,
      images: JSON.stringify([]),
      status: 'available',
    },
  ];

  // 创建所有物品
  const allItems = [...books, ...supplies];
  
  for (const item of allItems) {
    await prisma.item.create({
      data: item,
    });
  }

  console.log(`已创建 ${allItems.length} 个示例物品（${books.length} 本书籍，${supplies.length} 件学习用品）`);
  console.log('示例数据添加完成！');
}

main()
  .catch((e) => {
    console.error('添加示例数据时出错:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

